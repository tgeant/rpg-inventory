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
          label: 'Nombre',
          type: 'number'
        },
        {
          field: 'name',
          label: 'Nom',
          type: 'text'
        },
        {
          field: 'description',
          label: 'Description',
          type: 'textArea'
        },
        {
          field: 'weight',
          label: 'Poids',
          type: 'number'
        },
        {
          field: 'price',
          label: 'Prix (PO)',
          type: 'number'
        },
      ]"
      labelButtonEdit="Sauvegarder"
      labelButtonCreate="Créer"
      :forceEdit=true
      :customBody="{
        inventory: this.$route.params.idInventory
      }"
      />
  </section>
</template>

<script>
import DetailAPI from '../components/DetailAPI.vue';

export default {
  components: { DetailAPI},
  name: "ItemDetail",
  methods: {
  },
};
</script>