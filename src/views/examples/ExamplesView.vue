<template>
<div>
    <ul class="sub-nav">
        <li>
            <router-link to="/examples/category/front-end">Front-end</router-link>
        </li>
        <li>
            <router-link to="/examples/category/mobile">Mobile</router-link>
        </li>
        <li>
            <router-link to="/examples/modal">Modal</router-link>
        </li>
    </ul>
    <!-- Header -->
    <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
    </transition>
</div>
</template>
