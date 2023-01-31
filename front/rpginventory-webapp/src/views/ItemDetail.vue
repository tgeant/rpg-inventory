<template>
  <section class="section">
    <b-breadcrumb separator="has-succeeds-separator">
      <b-breadcrumb-item tag='router-link' to="/">Inventaires</b-breadcrumb-item>
      <b-breadcrumb-item tag='router-link' :to="'/inventories/'+$route.params.idInventory">Détail inventaire</b-breadcrumb-item>
      <b-breadcrumb-item tag='router-link' :to="'/inventories/'+$route.params.id" active>Détail Item</b-breadcrumb-item>
    </b-breadcrumb>

    <h1 class="title">Détail Item</h1>

     <DetailAPI
     endpoint="items"
     :columns= "[
     {
          field: 'itemNumber',
          label: 'Quantité',
          type: 'number',
          min: '0'
        },
        {
          field: 'name',
          label: 'Nom',
          type: 'text'
        },
        {
          field: 'description',
          label: 'Description',
          type: 'textarea'
        },
        {
          field: 'category',
          label: 'Categorie',
          type: 'select',
          options: ['Objets Précieux', 'Arme', 'Equipement', 'Nourriture', 'Potion', 'Parchemin']
        },
        {
          field: 'weight',
          label: 'Poids (Kg)',
          type: 'number',
          min: '0',
          step: '0.01'
        },
        {
          field: 'price',
          label: 'Prix (PO)',
          type: 'number',
          min: '0',
          step: '0.01'
        },
      ]"
      labelButtonEdit="Sauvegarder"
      labelButtonCreate="Créer"
      :forceEdit=true
      :customBody="{
        inventory: this.$route.params.idInventory
      }"
      v-on:onDataLoaded="getItem"
      />

  <div v-if="this.$route.params.id!='create'">
  <h1 class="title">Transférer à</h1>
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
      <b-field label="Transférer l'item à ">
            <b-select placeholder="Selectionner un inventaire" v-on:input="selectInventory">
                <option
                    v-for="option in inventories"
                    :value="option.id"
                    :key="option.id">
                    {{ option.name }}
                </option>
            </b-select>
        </b-field>

        <p class="control">
          <b-button label="Transférer" type="is-primary" @click="transfer()"/>
        </p>
      </div>
      </div>
    </div>


  </section>
</template>

<script>
import DetailAPI from '../components/DetailAPI.vue';
import ApiHandlerService from "../services/ApiHandlerService";
import { ToastProgrammatic as Toast } from "buefy";

export default {
  components: { DetailAPI},
  name: "ItemDetail",
  data(){
      return {
        inventories: [],
        selectedInvetoryId: '',
        item: {}
      }
    },
  methods: {
    selectInventory(value){
      this.selectedInvetoryId = value;
    },
    transfer(){

      if(this.selectedInvetoryId!=''){
      this.item.inventory = this.selectedInvetoryId;

      ApiHandlerService.put(
        "items",
        this.item.id,
        this.item,
        () => {
          Toast.open({
            message: "Mise à jour réussi !",
            type: "is-success",
          });

           this.$router.back();
        }
        );
      }
    },
    getItem(data){
      this.item = data;
    }
  },
  mounted() {
    ApiHandlerService.getList(
        "inventories",
        [],
        ({ data })=> {
          this.inventories = data.rows;
        }
      );

  },
};
</script>