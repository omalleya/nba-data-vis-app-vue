<template>
  <div class="ui centered card">

    <!-- Search -->
    <div class="content">
      <label class="header">Results</label>
      {{ playerId }}
    </div>
    
  </div>
</template>

<script type="text/javascript">

  export default {
    props: ['playerId'],
  };
  
</script>

<style>
</style>
