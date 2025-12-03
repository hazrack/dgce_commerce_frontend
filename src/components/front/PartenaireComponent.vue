<template>
  <div class="partenaire-component">
    <div class="container">
      <div class="p-4">
        <div class="partnaire-central">
          <div v-for="(step, index) in partenaireInfos" :key="index" class="logo-central-item my-4">
            <div class="logo-img-block">
              <img :src="step.image" class="logo-img-simple" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      partenaireInfos: [
        { image: new URL('../../assets/images/img-cci.png', import.meta.url).href },
        { image: new URL('../../assets/images/img-guce.png', import.meta.url).href },
        { image: new URL('../../assets/images/img-gude.png', import.meta.url).href },
        { image: new URL('../../assets/images/img-export.jpeg', import.meta.url).href },
        { image: new URL('../../assets/images/img-cepici.jpeg', import.meta.url).href },
        { image: new URL('../../assets/images/img-ocpv.jpeg', import.meta.url).href },
      ]
    }
  }
}
</script>


<style lang="scss" scoped>

.partenaire-component {
  background: #f8f9fa; // Fond gris clair pour faire ressortir les logos

  .partnaire-central {
    display: flex;
    justify-content: center;
    flex-wrap: wrap; 
    gap: 30px;
  }

  .logo-central-item {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }

  
}

// Responsive styles
@media (max-width: 768px) {
  .logo-central-item {
    width: 120px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .logo-central-item {
    width: 100px;
    height: 70px;
  }
}


</style>