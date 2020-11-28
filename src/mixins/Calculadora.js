import bus from '@/bus'
export default {
  data: () => ({
    input: "",
    loading: false
  }),
  computed: {
    inputVacia() {
      return this.input.length == 0;
    },
  },
  methods: {
    addElement(v) {
      this.input += v;
    },
    deleteLast() {
      this.input = this.input.slice(0, -1);
    },
    allClear() {
      this.input = "";
    },
    evaluar() {
      this.loading = true;
      this.$store
        .dispatch(this.storeModule + "/result", this.input)
        .then(() => {
          this.$vuetify.goTo(440, {
            duration: 400,
            offset: 0,
            easing: "easeInOutCubic",
          });
          this.allClear();
        })
        .catch((e) => {
          bus.$emit("error", e);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
