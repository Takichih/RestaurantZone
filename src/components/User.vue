<template>
  <div class="userPage">
    <h1>Profile</h1>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="text-left">Name:</h3>
        </v-col>
      </v-row>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="firstname"
                :counter="10"
                :rules="nameRules"
                label="First name"
                model-value="Gordon"
                hide-details
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="lastname"
                :counter="10"
                :rules="nameRules"
                label="Last name"
                model-value="Ramsay"
                hide-details
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" class="d-flex">
              <v-row class="full-height">
                <v-btn class="bottom-left-btn" color="primary">Save</v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="text-left">Score:</h3>
        </v-col>
      </v-row>
      <v-sheet
        class="d-flex align-center px-4 py-8 mx-auto"
        color="#FFFFF"
        max-width=""
        rounded="lg"
      >
        <v-progress-linear
          :location="null"
          bg-color="#7e7e7e"
          buffer-color="#2196F3"
          buffer-opacity="1"
          buffer-value="3"
          color="#4CAF50"
          height="12"
          max="9"
          min="0"
          model-value="2"
          rounded
        ></v-progress-linear>

        <div class="ms-4 text-h6">47/100</div>
      </v-sheet>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="text-left">Recently Visited:</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Queues de Castor</v-card-title>
            <v-card-subtitle>Number of Visits: 1</v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Reserve"></v-btn>
              <v-spacer></v-spacer>
              <v-btn>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-card-actions>
                <v-btn>
                  <v-icon>mdi-share</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Nomi</v-card-title>
            <v-card-subtitle>Number of Visits: 2</v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Reserve"></v-btn>
              <v-spacer></v-spacer>
              <v-btn>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-card-actions>
                <v-btn>
                  <v-icon>mdi-share</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Red Lobster</v-card-title>
            <v-card-subtitle>Number of Visits: 10</v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Reserve"></v-btn>
              <v-spacer></v-spacer>
              <v-btn>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-card-actions>
                <v-btn>
                  <v-icon>mdi-share</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Dominos</v-card-title>
            <v-card-subtitle>Number of Visits: 5</v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange-lighten-2" text="Reserve"></v-btn>
              <v-spacer></v-spacer>
              <v-btn>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-card-actions>
                <v-btn>
                  <v-icon>mdi-share</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script></script>

<style>
.d-flex {
  display: flex;
  justify-content: flex-end;
}

.bottom-left-btn {
  margin: 22px;
}
</style>
