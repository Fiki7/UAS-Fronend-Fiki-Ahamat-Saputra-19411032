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
              <div class="text-h6">Data Transaksi</div>
              <div>Data Transaksi Dan Pemesanan</div>
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
                  {{ props.row.dataDonor[0].NamaRelawan }}
                </q-td>
                <q-td key="golonganDarah" :props="props">
                  {{ props.row.dataDonor[0].golonganDarah }}
                </q-td>
                 <q-td key="jumlah" :props="props">
                  {{ props.row.jumlah }}
                </q-td>
                 <q-td key="nama" :props="props">
                  {{ props.row.dataUser[0].namaLengkap }}
                </q-td>
                  <q-td key="status" :props="props">
                  <q-badge v-if="props.row.status === 1" color="red" class="q-pa-sm">
                    Belum Dikonfirmasi
                  </q-badge>
                  <q-badge v-else-if="props.row.status === 2" color="orange" class="q-pa-sm">
                    Sedang Dalam Pengiriman
                  </q-badge>
                  <q-badge v-else color="green" class="q-pa-sm">
                    Sudah Diterima Pembeli
                  </q-badge>
                </q-td>
                  <q-td key="aksi" :props="props">
                    <q-btn @click="openDetail(props.row)" label="Detail" color="black" unelevated />
                    <q-btn :disabled="props.row.status !== 1" @click="confirm(props.row._id)" label="Konfirmasi" class="q-ml-lg" color="blue" unelevated />
                </q-td>
              </q-tr>
            </template>
            </q-table>
      </q-card-section>
    </q-card>
    <q-dialog
      v-model="detail"
      v-if="detail"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Detail Order</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col">
              <div class="text-caption">
                Nama Penerima
              </div>
              <div class="text-weight-bold">
                {{activeData.dataUser[0].namaLengkap}}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Nama Relawan
              </div>
              <div class="text-weight-bold">
                {{activeData.dataDonor[0].NamaRelawan}}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Harga
              </div>
              <div class="text-weight-bold">
                Rp. {{activeData.harga}},-
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Jumlah Beli
              </div>
              <div class="text-weight-bold">
                {{activeData.jumlah}}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Total
              </div>
            </div>
          </div>
          <div class="row">
            <q-img :src="`http://localhost:5000/${activeData.image}`"></q-img>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'NamaRelawan', align: 'center', label: 'Nama Relawan', field: 'NamaRelawan', sortable: true },
        { name: 'golonganDarah', align: 'center', label: 'Golongan Darah', field: 'golonganDarah', sortable: true },
        { name: 'jumlah', align: 'center', label: 'Jumlah', field: 'jumlah', sortable: true },
        { name: 'nama', align: 'center', label: 'Nama Penerima', field: 'nama', sortable: true },
        { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      data: [],
      detail: false,
      activeData: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('order/getallorder')
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.detail = true
    },
    confirm (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin Menerima Order tersebut?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.put(`order/konfirmasiorder/${id}`)
          .then((res) => {
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
