<template>
  <div class="w">
    <el-autocomplete
      popper-class="my-autocomplete"
      v-model="input"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @focus="cgFocus"
    >
      <template slot-scope="{ item }">
        <el-radio :label="item.name">{{ item.name }}</el-radio>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      lists: [],
      list: [],
      isFocus: false
    };
  },
  mounted() {
    this.getLists();
  },
  methods: {
    querySearch(val, cb) {
      if (!this.input) {
        cb(this.lists);
      }
      if (this.isFocus) {
        this.isFocus = false;
        cb(this.list);
      }
      if (this.isFocus) console.log(val);
      this.cgSend(val).then(res => {
        cb(res);
        this.list = res;
      });
    },
    cgFocus() {
      this.isFocus = true;
    },
    getLists() {
      this.cgSend().then(res => {
        this.lists = res;
      });
    },
    cgSend(val = "") {
      return this.$axios({ url: `/cities`, params: { name: val } }).then(
        res => {
          const { data } = res.data;
          return data;
        }
      );
    }
  }
};
</script>

<style scoped lang="less">
.w {
  height: 1000px;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    background: #000 !important;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: red;
    }
  }
}
</style>
