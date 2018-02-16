<template>
<div>
    <h1>Examples</h1>
    <nav class="inner">
        <router-link to="/examples/responsiveforms">Responsive forms</router-link>
        <router-link to="/examples/category/front-end">Front-end</router-link>
        <router-link to="/examples/category/mobile">Mobile</router-link>
    </nav>
    <!-- Header -->
    <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
    </transition>
</div>
</template>
