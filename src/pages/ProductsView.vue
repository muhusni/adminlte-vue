<template>
  <div class="col-12">
    <va-alert type="success" v-if="success" :dismissible="true">
      <h4 slot="header">
        <i class="icon fa fa-check"></i> {{ message }}
      </h4>
    </va-alert>
    <div class="box">
      <div class="box-header with-border">
        <div class="box-header with-border">
          <h3 class="box-title">User Manager</h3>
          <div class="box-tools pull-right">
            <button class="btn btn-success" @click="openModal()">Add Product <i class="fa fa-plus"></i></button>
            <!-- Buttons, labels, and many other things can be placed here! -->
            <!-- Here is a label for example -->
            <!-- <span class="label label-primary">Label</span> -->
          </div>
        </div>
        <div class="box-body">
          <table class="table table-responsive">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.quantity }}</td>
                <td>
                  <button class="btn btn-primary" @click="openEdit(product.id)"> <i class="fa fa-edit"></i></button>
                  <button @click="openDelete(product.id)" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div class="modal fade" id="bsModal" tabindex="-1" role="dialog" aria-labelledby="bsModalLabel" data-toggle="modal"
      data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="bsModalLabel">Add User</h4>
          </div>
          <form @submit.prevent="handleSubmit()">
            <div class="modal-body">
              <va-alert type="danger" v-if="error" :dismissible="true">
                <h4 slot="header">
                  {{ message }}
                </h4>
              </va-alert>
              <label for="Name">Product Name</label>
              <input type="text" class="form-control" required v-model="product.name">
              <label for="">Description</label>
              <input type="text" class="form-control" required v-model="product.description">
              <label for="Name">Price</label>
              <input type="number" class="form-control" required v-model="product.price">
              <label for="Name">Quantity</label>
              <input type="number" class="form-control" required v-model="product.quantity">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" @click="cancel">Cancel</button>
              <button type="submit" class="btn btn-success">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div class="modal fade" id="bsEdit" tabindex="-1" role="dialog" aria-labelledby="bsModalLabel" data-toggle="modal"
      data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="bsModalLabel">Edit Product</h4>
          </div>
          <form @submit.prevent="handleSubmitEdit()">
            <div class="modal-body">
              <va-alert type="danger" v-if="error" :dismissible="true">
                <h4 slot="header">
                  {{ message }}
                </h4>
              </va-alert>
              <label for="Name">Product Name</label>
              <input type="text" class="form-control" required v-model="editProduct.name">
              <label for="">Description</label>
              <input type="text" class="form-control" required v-model="editProduct.description">
              <label for="Name">Price</label>
              <input type="number" class="form-control" required v-model="editProduct.price">
              <label for="Name">Quantity</label>
              <input type="number" class="form-control" required v-model="editProduct.quantity">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" @click="cancelEdit">Cancel</button>
              <button type="submit" class="btn btn-success">Edit Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from '../components/ModalUser.vue'
import VAAlert from '../components/VAAlert.vue'
import AxiosProduct from '../api/ProductAxios'
import swal from 'sweetalert'
export default {
  data () {
    return {
      products: [],
      product: {
        name: '',
        description: '',
        price: '',
        quantity: ''
      },
      editProduct: {
        id: '',
        name: '',
        description: '',
        price: '',
        quantity: ''
      },
      message: '',
      success: false,
      error: false
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      AxiosProduct.get('/products').then((response) => {
        this.products = response.data
      })
    },
    getProduct (id) {
      AxiosProduct.get('/products/' + id).then((response) => {
        this.editProduct.id = response.data.id
        this.editProduct.name = response.data.name
        this.editProduct.description = response.data.description
        this.editProduct.price = response.data.price
        this.editProduct.quantity = response.data.quantity
      })
    },
    openModal () {
      $('#bsModal').modal('show')
    },
    openEdit (id) {
      $('#bsEdit').modal('show')
      this.getProduct(id)
    },
    handleSubmit: function () {
      AxiosProduct.post('products', this.product).then((response) => {
        this.message = response.data
        this.success = true
        $('#bsModal').modal('hide')
        this.getProducts()
        this.clearField()
      }).catch((error) => {
        this.error = true
        if (error.response.status === 422) { this.message = JSON.stringify(error.response.data.errors) } else {
          this.message = error
        }
      })
    },
    handleSubmitEdit: function () {
      AxiosProduct.put('products/' + this.editProduct.id, this.editProduct).then((response) => {
        this.message = response.data
        this.success = true
        $('#bsEdit').modal('hide')
        this.getProducts()
        this.clearField()
      }).catch((error) => {
        this.error = true
        if (error.response.status === 422) { this.message = JSON.stringify(error.response.data.errors) } else {
          this.message = error
        }
      })
    },
    cancel: function () {
      $('#bsModal').modal('hide')
    },
    cancelEdit: function () {
      $('#bsEdit').modal('hide')
    },
    clearField () {
      this.product.name = ''
      this.product.description = ''
      this.product.price = ''
      this.product.quantity = ''
      this.editProduct.id = ''
      this.editProduct.name = ''
      this.editProduct.description = ''
      this.editProduct.price = ''
      this.editProduct.quantity = ''
    },
    openDelete (iddel) {
      swal({
        title: 'Hapus User ini?',
        text: 'Anda yakin akan menghapus user ini?',
        icon: 'error',
        buttons: {
          cancel: 'Cancel',
          Yes: 'Yes'
        }
      })
        .then((value) => {
          switch (value) {
            case 'Yes':
              this.deleteProduct(iddel)
          }
        })
    },
    deleteProduct (id) {
      AxiosProduct.delete('products/' + id, { body: { id: id } }).then(() => {
        this.getProducts()
        swal('success', 'berhasil menghapus', 'success')
      })
    }
  },
  components: {
    Modal,
    'va-alert': VAAlert
  }
}
</script>

<style>
</style>
