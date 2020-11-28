import bus from '@/bus'
export default {
  data: () => ({
    dialog: false,
    errorMsg: null,
  }),
  created() {
    bus.$on("error", (error) => {
      this.errorMsg = error
      this.dialog = true
    });
  },
}