<template lang="pug">
    section.tile(
        v-if="item"
        :class="{ selected: isFavorite }"
    )
        div
            div.swiper-container
                client-only
                    swiper.swiper(
                        v-if="swiper"
                        :options="swiper"
                    )
                        slide.slide(v-for="(img, index) in item.media.img" :key="index")
                            lazy-img(:src="img[0].filename" :srcset="createSrcSet(img)")
                div.control.prev(ref="button-prev" slot="button-prev")
                div.control.next(ref="button-next" slot="button-next")
            article.content
                header
                    //- h3 {{ item.title | uppercase }}
                    h3 ПРОЕКТ {{ item.code }}
                aside.description
                    div.description
                        div.props.main
                            ul.list
                                li.prop(
                                    v-if="item.description.length"
                                    v-for="(entry, index) in item.description.slice(0, entriesShownByDefault)" :key="index"
                                )
                                    span {{ entry.join(': ') }}
                        div.props.extra(
                            ref="extra-properties"
                            :style="expandableStyle"
                            :class="{ expanded: more }"
                        )
                            ul.list(
                                ref="extra-properties-list"
                                :style="{ position: 'absolute' }"
                            )
                                li.prop(
                                    v-if="item.description.length > 1"
                                    v-for="(entry, index) in item.description.slice(entriesShownByDefault)" :key="index"
                                )
                                    span {{ entry.join(': ') }}
                    div.expand-button(
                        v-if="item.description.length > entriesShownByDefault"
                        :class="{ rotated: more }"
                        @click="toggleMore"
                    )
                        button ▼
                aside
                    div.fav-button
                        button(@click="fav")
                            span В избранное
                            span.star &#9733;
</template>

<script src="./index.js" />
<style src="./index.sass" lang="sass" scoped />