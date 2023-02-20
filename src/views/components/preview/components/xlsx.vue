<template>
  <div class="spreadsheet-box" ref="xlsxRef"></div>
</template>

<script setup>
// spreadsheet 参考 https://hondrytravis.com/x-spreadsheet-doc
// xlsx 参考 https://www.npmjs.com/package/xlsx
// 引入依赖
import { ref, nextTick, watch } from 'vue';
import Spreadsheet from 'x-data-spreadsheet';
import XLSX from '@n/xlsx/xlsx.js';
import zhCN from 'x-data-spreadsheet/src/locale/zh-cn';
import { ElMessage } from 'element-plus';
Spreadsheet.locale('zh-cn', zhCN);

let props = defineProps({
  url: {
    type: String,
    default: '',
  },
  fullscreen: Boolean,
});

let xlsxH = ref(0);

let xlsxRef = ref();

// 获取当前文件信息
let getXlsxToJson = (url) => {
  return new Promise(async (resolve) => {
    const f = await (await fetch(url)).arrayBuffer();
    resolve(stox(f));
  }).catch((err) => {
    ElMessage.warning('文件读取失败！');
  });
};

// 初始化显示xlsx
let initXlsx = async () => {
  if (xlsxRef.value) {
    xlsxRef.value.childNodes.length > 0
      ? xlsxRef.value.removeChild(xlsxRef.value.childNodes[0])
      : null;
  }

  // 初始化参数
  let option = {
    mode: 'read', // edit | read
    showToolbar: false, // 顶部工具栏
    showGrid: true,
    showContextmenu: false, // 切换右键菜单显示状态
    showBottomBar: true, // 底部工具栏
    view: {
      height: () => xlsxRef.value && xlsxRef.value.clientHeight,
      width: () => xlsxRef.value && xlsxRef.value.clientWidth,
    },
    row: {
      len: 100,
      height: 25,
    },
    col: {
      len: 26,
      width: 100,
      indexWidth: 60,
      minWidth: 60,
    },
    style: {
      bgcolor: '#ffffff',
      align: 'left',
      valign: 'middle',
      textwrap: false,
      strike: false,
      underline: false,
      color: '#0a0a0a',
      font: {
        name: 'Helvetica',
        size: 10,
        bold: false,
        italic: false,
      },
    },
  };

  // xlsx 显示数据
  const data = await getXlsxToJson(props.url);

  option.row.len = xlsxH.value;
  let sheetObj = new Spreadsheet(xlsxRef.value, option).loadData(data); // load data

  // 禁止右键，右键有设置单元格可编辑菜单，防止修改表头
  sheetObj.sheet.contextMenu.isHide = true;

  // data validation
  sheetObj.validate();
};

let callback = () => {
  let timer = null;
  return () => {
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      initXlsx();
      timer = null;
    }, 710);
  };
};

nextTick(() => {
  initXlsx();
  window.addEventListener('resize', callback());

  watch(() => props.fullscreen, callback());
});

/**
 * 可参考： https://docs.sheetjs.com/xspreadsheet/
 * ArrayBuffer格式或者文件(file[0]也是ArrayBuffer格式)
 * @param {*} f ArrayBuffer格式文件
 * @returns 返回格式化好的json格式数据
 */
let stox = (f) => {
  const wb = XLSX.read(f);
  console.log(wb);
  var out = [];
  wb.SheetNames.forEach(function (name) {
    var o = { name: name, rows: {} };
    var ws = wb.Sheets[name];
    if (!ws || !ws['!ref']) return;
    var range = XLSX.utils.decode_range(ws['!ref']);
    range.s = { r: 0, c: 0 };
    var aoa = XLSX.utils.sheet_to_json(ws, {
      raw: false,
      header: 1,
      range: range,
    });
    aoa.forEach(function (r, i) {
      var cells = {};
      r.forEach(function (c, j) {
        cells[j] = { text: c };
        var cellRef = XLSX.utils.encode_cell({ r: i, c: j });
        if (ws[cellRef] != null && ws[cellRef].f != null) {
          cells[j].text = '=' + ws[cellRef].f;
        }
      });
      o.rows[i] = { cells: cells };
    });
    o.merges = [];
    (ws['!merges'] || []).forEach(function (merge, i) {
      if (o.rows[merge.s.r] == null) {
        o.rows[merge.s.r] = { cells: {} };
      }
      if (o.rows[merge.s.r].cells[merge.s.c] == null) {
        o.rows[merge.s.r].cells[merge.s.c] = {};
      }
      o.rows[merge.s.r].cells[merge.s.c].merge = [
        merge.e.r - merge.s.r,
        merge.e.c - merge.s.c,
      ];
      o.merges[i] = XLSX.utils.encode_range(merge);
    });
    out.push(o);
  });
  setXLSXH(out);
  return out;
};
/**
 * 获取当前显示页签中最大显示高度
 * @param {*} out 页签数据
 */
let setXLSXH = (out) => {
  xlsxH.value = Math.max(...out.map((item) => Object.keys(item.rows).length));
};
</script>
<style scoped lang="scss">
.spreadsheet-box {
  height: 100%;
}
</style>
