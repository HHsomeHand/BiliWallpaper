<script setup>
import weixing from '@/assets/QR/weixing.jpg'
import zhifubao from '@/assets/QR/zhifubao.jpg'
import { ElMessage } from 'element-plus'

const qq = ref('2402398917');

async function copyQQ() {
  const clipboardObj = navigator.clipboard;
  const result = await navigator.clipboard.writeText(qq.value)
  ElNotification({
    title: '消息',
    message: '已复制',
    type: 'success',
  })
}
</script>

<template>
  <div class="contact-support">
    <el-text size="large" type="primary">  联系 & 捐助 ♥ </el-text>
    <el-row>
      <el-text  >
        作者的 QQ 号码是 <el-button type="primary" @click="copyQQ" style="padding: 0 0" text>{{  qq  }}</el-button>，
        下面是捐助二维码。项目已
        <el-link style="margin-bottom: 2px" type="primary" href="https://github.com/HHsomeHand/BiliWallpaper" target="_blank">开源</el-link>
        ，若您愿意捐助，请在备注中注明<el-text type="primary">您的名称、
        网名或联系方式。</el-text>
      </el-text >
    </el-row>
    <el-row>
      <el-text >
        未来我会建立一个网站，专门记录所有曾帮助过我的朋友，衷心感谢您的支持！
        在使用脚本过程中如果遇到
        <el-text type="primary">任何问题</el-text>，欢迎随时联系我，
        <el-text type="primary">脚本定制</el-text>也可以通过 QQ 进一步交流。
      </el-text>
    </el-row>
    <div class="container">
      <el-card class="qr-img">
        <el-image  :preview-src-list="[weixing]" :src="weixing"  />
      </el-card>

      <el-card class="qr-img">
        <el-image  :preview-src-list="[zhifubao]" :src="zhifubao"  />
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 10px;
  display: flex;
  gap: 5px;

}
</style>