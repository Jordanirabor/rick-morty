<template>
  <div class="four-oh-four">
    <div class="four-oh-four__wrapper">
      <div class="four-oh-four__image">
        <img :src="require('@/assets/images/404/4044.jpeg')" alt srcset />
      </div>
      <div class="four-oh-four__content">
        <h1 class="four-oh-four__hero">404</h1>
        <div class="four-oh-four__hero-text">
          <span
            >Looks like this page is missing. Don't worry though, our best men
            are on the case.</span
          >
        </div>
        <div class="hero-small">
          Meanwhile, why don't you try again by going
        </div>
        <div class="button-wrapper">
          <input type="button" value="Back Home" class="home-button" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// // image1 : () => import('@/assets/images/404/4041.jpg');
// import image1 from "@/assets/images/404/4041.jpg";
// import image2 from "@/assets/images/404/4042.png";
// import image3 from "@/assets/images/404/4043.jpeg";
// import image4 from "@/assets/images/404/4043.png"
export default {
  //   data() {
  //     return {
  //         images: [image1, image2, image3, image4],
  //         currentImage: null,
  //     };
  //   },
  //   methods: {
  //     // getImage() {
  //     //  for(let i = 0; i < this.images.length; i++){
  //     //     this.currentImage = this.images[i];
  //     //
  //     //  }
  //     // }
  //   },
  //   mounted() {
  //     // this.getImage()
  //   },
};
</script>
<style lang="scss" scoped>
.four-oh-four {
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #f5f8fa;
  &__wrapper {
    align-items: center;
  }
  &__image {
    display: flex;
    margin: 0 auto;
    width: 70%;
  }
  &__hero {
    font-size: 4em;
    font-weight: 900;
    text-align: center;
  }
  &__hero-text {
    display: flex;
    justify-content: center;
    font-weight: bolder;
    font-size: 1.2em;

    span {
    }
  }
  .hero-small {
    margin-top: 2em;
    text-align: center;
  }
  .button-wrapper {
    display: flex;
    justify-content: center;
  }
  .home-button {
    border: 0;
    margin-top: 1em;
    background-color: #97ce4c;
    padding: 1em;
    color: #fff;
    font-weight: bolder;
    font-size: 1.3em;
    border-radius: 0.5em;
    text-transform: uppercase;
    outline: 0;
    cursor: pointer;
    &:focus {
    }
  }
}
@media screen and (min-width: 1025px) {
  .four-oh-four {
    &__wrapper {
      display: grid;
      grid-template-columns: 50% 50%;
    }
    &__hero-text {
      display: flex;
      justify-content: center;
      font-weight: bolder;
      font-size: 1.2em;
      span {
        width: 48%;
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .four-oh-four {
    flex-direction: column;
    &__wrapper {
      justify-content: center;
      padding-top: 6em;
    }
    &__hero-text {
      font-size: 1.1em;

      span {
        text-align: center;
        width: 70%;
      }
    }
    .hero-small {
      font-size: 0.8em;
    }
  }
}
</style>
