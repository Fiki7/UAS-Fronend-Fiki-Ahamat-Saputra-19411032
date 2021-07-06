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
              <div class="text-h6">Data Donor</div>
              <div>Data  Anda</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-card-section>
            <q-table
            :data="data"
            :columns="columns"
            row-key="name"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="NamaRelawan" :props="props">
                  <div>
                  {{ props.row.NamaRelawan }}
                  </div>
                </q-td>
               <q-td key="golonganDarah" :props="props">
                  <div>
                  {{ props.row.golonganDarah }}
                  </div>
                </q-td>
                <q-td key="tahun" :props="props">
                  {{ props.row.tahun }}
                </q-td>
                <q-td key="deskripsi" :props="props">
                  <div class="ellipsis" style="max-width: 250px;">
                  {{ props.row.deskripsi }}
                  </div>
                </q-td>
                <q-td key="gambar" :props="props">
                <q-img
                  :src="`http://localhost:5000/${props.row.image}`"
                  spinner-color="blue"
                  style="height: 120px; max-width: 85px"
                  />
                </q-td>
                <q-td key="aksi" :props="props">
                  <div class="row q-gutter-md">
                    <q-btn :to="{ name: 'formEditBarang', params: { id: props.row._id }}" label="Edit" icon="edit" color="orange"/>
                    <q-btn @click="deleteBarang(props.row._id)" label="Hapus" icon="delete" color="red"/>
                  </div>
                </q-td>
              </q-tr>
            </template>
            </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'NamaRelawan', align: 'left', label: 'Nama Relawan', field: 'NamaRelawan', sortable: true },
        { name: 'golonganDarah', align: 'left', label: 'Golongan Darah', field: 'golonganDarah', sortable: true },
        { name: 'tahun', align: 'left', label: 'Tahun', field: 'tahun', sortable: true },
        { name: 'deskripsi', align: 'left', label: 'Deskripsi', field: 'deskripsi', sortable: true },
        { name: 'gambar', align: 'left', label: 'Gambar', field: 'gambar' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('donor/getall')
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          } else {
            this.showNotif(res.data.pesan, 'negative')
          }
        })
    },
    deleteBarang (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin Menghapus ini?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`donor/delete/${id}`)
          .then(res => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getData()
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
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
