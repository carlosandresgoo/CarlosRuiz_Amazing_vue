const { createApp } = Vue

const app = createApp( {

    data(){
        return {
            cards: [],
            params:undefined,
            id:undefined,
            view: undefined
            
        }
    },
    created(){
        fetch( "https://mindhub-xj03.onrender.com/api/amazing" )
            .then( response => response.json() )
            .then(data => { 
                this.params = new URLSearchParams(location.search);
                this.id = this.params.get("id")
                this.cards = data.events;
                this.view = data.events.find(e => e._id == this.id)
                console.log(this.view)
            }
            )
            .catch( err => console.log( err ) )
    },

})

app.mount('#app')
