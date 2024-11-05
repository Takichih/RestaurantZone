<template>
    <v-container>
        <v-card>
            <v-text-field v-model="rating" label="rating" type="number" min="0" max="5" placeholder="une note entre 0 et 5 s'il vous plait"></v-text-field>
            <v-text-field v-model="comment" label="comment"></v-text-field>
            <v-menu
              v-model="showDatePicker"
              transition="scale-transition"
              min-width="auto"
              :nudge-bottom="10"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="formattedDate"
                  v-model="showDatePicker"
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  prepend-icon="mdi-calendar"
                  readonly
                  label="Sélectionner une date"
                  @click:prepend="showCalendar"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="selectedDate"
                @input="showDatePicker = false"
                no-title
              ></v-date-picker>
            </v-menu>
           <v-btn @click="postData">submit</v-btn>
        </v-card>
    </v-container>
</template>

<script setup>
import {ref, computed} from "vue";
import moment from "moment-timezone";
import axios from "axios";

const props = defineProps(["id"]);
const emit = defineEmits(["visitSubmitted"]);
const showDatePicker = ref(false);
const comment = ref("");
const userId = ref("6569767db55a58e85c543213");
const rating = ref("");
const restaurantId = ref("");
restaurantId.value = props?.id;
const selectedDate = ref(new Date());

axios.defaults.baseURL = "https://ufoodapi.herokuapp.com/unsecure/users";

const formattedDate = computed(() => {
  return moment(selectedDate.value).tz('America/Toronto').format('YYYY-MM-DDTHH:mm:ssZ');
});

const showCalendar = () => {
  showDatePicker.value = true;
};

const postData = async() =>{
    try{
      const rate = parseFloat(rating.value);
      if (rate > 5 || rate <0){
        alert("Entrez une note entre 0 et 5 s'il vous plait")
      }
      if(rating.value !== "" && rate <= 5 && rate >= 0 ){
        const dataSent = {
            "user_id": userId.value,
            "restaurant_id":props.id,
            "comment":comment.value,
            "rating":rate,
            "date":moment(selectedDate.value).tz('America/Toronto').format('YYYY-MM-DDTHH:mm:ssZ')
        }
        console.log("Données envoyées :", dataSent);

        const response = await axios.post(`/${userId.value}/restaurants/visits`, dataSent);
        console.log("Reponse de l'API",response.data);

        emit("visitSubmitted", { ...response.data, user_id: userId.value });

        comment.value = "";
        rating.value = 0;
      }
    }catch(error){
      console.log("Une erreur est survenue " + error.message);
    }

}
</script>
<style>

</style>
