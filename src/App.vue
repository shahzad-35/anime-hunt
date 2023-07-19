<template>
  <div class="app">
    <header>
      <h1>
        The<Strong>Anime</Strong>App
      </h1>
      <form class="search-box" @submit.prevent="HandleSearch">
        <input type="text" class="search-field" placeholder="Search for anime ...." v-model="searchQuery" required />
      </form>
    </header>
    <main>
      <div class="cards" v-if="animeList.length >0">
        <AnimeCards
            v-for="anime in animeList"
            :key="anime.id"
            :anime="anime"
            />
      </div>
      <div class="no-results" v-else>
				<h3>Sorry, we have no results...</h3>
			</div>
    </main>
  </div>
</template>

<script>

import { ref } from 'vue';
import AnimeCards from './components/AnimeCards.vue';

export default {
  components: {
    AnimeCards,
  },
  setup() {
    const searchQuery = ref("");
    const animeList = ref([]);

    const HandleSearch = async() => {
      animeList.value = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery.value}&limit=10&rating=pg13`)
                        .then(res => res.json())
                        .then(data => data.data);
      searchQuery.value = "";
    }
    return {
      AnimeCards,
      searchQuery,
      animeList,
      HandleSearch
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  font-family: 'Fira Sans', sans-serif;
}

a {
  text-decoration: none;
}

header {
  padding-top: 50px;
  padding-bottom: 50px;

  h1 {
    color: #888;
    font-size: 42px;
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 30px;

    strong {
      color: #313131;
    }

    &:hover {
      color: #28e738;
    }
  }

  .search-box {
    display: flex;
    justify-content: center;
    padding-left: 30px;
    padding-right: 30px;

    .search-field {
      appearance: none;
      background: none;
      border: none;
      outline: none;

      background-color: #F3F3F3;

      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
      display: block;
      width: 100%;
      max-width: 600px;
      padding: 15px;
      border-radius: 8px;
      color: #313131;

      font-size: 20px;
      transition: 0.4s;

      &::placeholder {
        color: #AAA;
      }

      &:focus,
      &:valid {
        color: #FFF;
        background-color: #313131;
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.15);
      }
    }
  }
}
main {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 30px;
  padding-right: 30px;

  .cards {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -8px;
  }
}
</style>
