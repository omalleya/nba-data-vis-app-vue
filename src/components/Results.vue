<template>
  <div class="ui centered card">

    <!-- Results -->
    <div class="content">
      <label class="header">Results</label>
      <p v-for='search of searches'>{{ search }}</p>
    </div>
    
  </div>
</template>

<script type="text/javascript">

  export default {
    props: ['searches'],
  };
  
</script>

<style>
</style>
