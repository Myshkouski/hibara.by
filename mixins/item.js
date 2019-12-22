export default {
    props: ['id'],
    
    data() {
        try {
            return {
                item: require(`~/assets/items/${this.id}.json`)
            }
        } catch (error) {
            return {
                item: null
            }
        }
    }
}