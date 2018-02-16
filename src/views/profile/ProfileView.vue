<template>
  <div>
      <ul class="sub-nav">
        <li>
          <router-link to="/profile/userinfo">User info</router-link>
        </li>
        <li>
          <router-link to="/profile/userpassword">Password</router-link>
        </li>
      </ul>
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>  
  </div>
</template>
