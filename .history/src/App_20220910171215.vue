<template>
  <div id="material-kit">
    <div :class="{ 'nav-open': NavbarStore.showNavbar }">
      <router-view name="header" />
      <div>
        <router-view />
      </div>
      <router-view name="footer" />
    </div>
  </div>
</template>



java -server -d64 -Xmx3550M -Xms3550M -Xss256k -XX:PermSize=256m -XX:MaxPermSize=256m -XX:NewSize=1024m -XX:MaxNewSize=1024m -XX:+UseParNewGC -XX:+CMSIncrementalPacing -XX:+UseFastAccessorMethods -XX:+UseConcMarkSweepGC -XX:MaxGCPauseMillis=100 -XX:+CMSParallelRemarkEnabled -XX:ParallelGCThreads=20 -jar minecraft_server.1.8.jar nogui
