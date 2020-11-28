import bus from "@/bus";
export default {
  data: () => ({
    loading: false,
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
  }),
  computed: {
    enMovil() {
      return this.$vuetify.breakpoint.name == "xs";
    },
  },
  methods: {
    getFormattedDate(date) {
      let horas =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutos =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

      return `${date.getDate()}/${this.months[date.getMonth()].substring(
        0,
        3
      )}/${date.getFullYear()} - ${horas}:${minutos} hrs.`;
    },
    eliminarResultado(res) {
      this.loading = true;
      this.$store
        .dispatch(this.storeModule+"/eliminarResultado", res)
        .then(() => {
          this.$vuetify.goTo(440, {
            duration: 400,
            offset: 0,
            easing: "easeInOutCubic",
          });
        })
        .catch((e) => {
          bus.$emit("error", e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  }
}