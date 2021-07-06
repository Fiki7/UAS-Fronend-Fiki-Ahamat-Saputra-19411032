<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-b;ue-grey-12">
              <div class="text-h6">Edit Donor</div>
              <div>Input Data</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card>
      <q-card-section class="row">
            <q-form
            @submit="onSubmit()"
        class="q-gutter-md col-md-6 col-xs-12"
        >
        <q-input
            filled
            v-model="form.NamaRelawan"
            label="Nama Relawan"
            :rules="[ val => val && val.length > 0 || 'Mohon isi Nama Anda']"
        />
        <q-input
            filled
            v-model="form.golonganDarah"
            label="Golongan Darah"
            :rules="[ val => val && val.length > 0 || 'Mohon isi Golongan Darah']"
        />
        <q-input
            filled
            v-model="form.tahun"
            label="Tahun Barang"
            :rules="[ val => val && val.length > 0 || 'Mohon isi Tahun']"
           />
        <q-input
          v-model="form.deskripsi"
          filled
          type="textarea"
          label="Deskripsi"
        />
        <q-file
        accept=".jpg, .png, image/*"
        color="orange"
        v-model="image"
        label="Gambar">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
        </q-file>
        <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
        </q-form>
      </q-card-section>
    </q-card>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      form: {
        NamaRelawan: null,
        golonganDarah: null,
        tahun: null,
        deskripsi: null
      },
     
      image: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(`donor/getbyid/${this.$route.params.id}`)
        .then(res => {
          if (res.data.sukses) {
            this.form = res.data.data
          } else {
            this.$router.push({ name: 'dataDonor' })
          }
        })
    },
    onSubmit () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(this.form))
      this.$axios.put(`donor/edit/${this.$route.params.id}`, formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.$router.push({ name: 'dataDonor' })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  }
}
</script>
<style scoped>
.left {
  width: 5px;
  height: 100%;
  background-color: aqua;
}
</style>
