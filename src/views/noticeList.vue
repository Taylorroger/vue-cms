<template>
  <mainContainer>
    <div class="form-con">
      <el-form ref="form"
               :model="params" label-width="100px"
               label-position="left" size="small">
        <el-form-item label="标题：">
          <div class="input-itm">
            <el-input placeholder="请输入标题" type="text" v-model="params.title"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="公告详情：">
          <div class="input-itm">
            <el-input placeholder="请输入公告详情" type="text" v-model="params.content"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="发布者：">
          <div class="input-itm">
            <el-input placeholder="请输入发布者" type="text" v-model="params.author"></el-input>
          </div>
        </el-form-item>
        <div class="btn-con">
          <el-button type="primary" size="small" @click="search">查询</el-button>
          <el-button size="small" @click="reset">重置</el-button>
        </div>
      </el-form>
    </div>

    <div class="table-btn-con">
      <i class="el-icon-circle-plus-outline" @click="$router.push('noticeCreate')"></i>
    </div>

    <div class="table-con">
      <el-table fit :data="listData" size="small">
        <el-table-column prop="_id" label="ID" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="content" label="公告详情" align="center"></el-table-column>
        <el-table-column prop="title" label="栏目名称" align="center"></el-table-column>
        <el-table-column prop="author" label="发布者" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="btn-con">
              <i class="el-icon-edit-outline"
                 @click="$router.push(`${routerPath.noticeCreatePath}?id=${scope.row._id}`)"></i>
              <i class="el-icon-delete"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page-con">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="params.currentPage"
        :page-sizes="[10,20,30]"
        :page-size="params.pageSize"
        layout="total,sizes,prev,pager,next,jumper"
        :total="totalSize"
      ></el-pagination>
    </div>
  </mainContainer>
</template>

<script>
import mainContainer from '@/components/mainContainer'
import * as api from '@/common/api'
import util from '@/common/util'
import routerPath from '@/router/routerPath'

export default {
  name: 'noticeList',
  data() {
    return {
      totalSize: 0,
      params: {
        name: '',
        currentPage: 1,
        pageSize: 10
      },
      listData: [],
      routerPath
    }
  },
  components: {
    mainContainer
  },
  activated() {
    this.noticeGetList()
  },
  methods: {
    search() {
      this.noticeGetList()
    },
    reset() {
      this.params = Object.assign(
        {},
        this.params,
        {
          title: ''
        }
      )
    },
    sizeChange(pageSize) {
      this.params.pageSize = pageSize
      this.noticeGetList()
    },
    currentChange(currentPage) {
      this.params.currentPage = currentPage
      this.noticeGetList()
    },
    noticeGetList() {
      api.noticeGetList({linkData: this.params}).then((res) => {
        if (res.data.code === 0) {
          this.totalSize = res.data.totalSize
          res.data.data.map((item) => {
            const d = util.getYMDHMS(item.createTime)
            item.createTime = [d.year, '.', d.month, '.', d.date, ' ', d.hour, ':', d.minute, ':', d.second].join('')
          })
          this.listData = res.data.data
        }
      })

    }
  }
}

</script>

<style lang="scss" scoped>
  .form-con {
    width: 100%;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    display: flex;

    .input-itm {
      width: 178px;
    }

  }

  .table-btn-con {
    padding: 10px 15px 0;
    color: #1489CD;
    font-size: 24px;

    i {
      margin: 0 5px;
    }
  }

  .table-con {
    padding: 0 20px;
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    margin-top: 10px;
  }

  .page-con {
    display: flex;
    justify-content: flex-end;
    background: #fff;
    padding: 10px 20px;
  }

  .btn-con {
    color: #1489CD;
    font-size: 18px;

    i {
      margin: 0 5px;
    }
  }


</style>
