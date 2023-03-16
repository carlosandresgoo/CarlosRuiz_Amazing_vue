const { createApp } = Vue

const app = createApp( {

    data(){
        return {
            valorBusqueda : '',
            eventos: [],
            categorys:[],
            checked : [],
            eventosFiltrados:[]
        }
    },
    created(){
        fetch( "https://mindhub-xj03.onrender.com/api/amazing" )
            .then( response => response.json() )
            .then(data => { 
                this.eventos = data.events;
                this.categorys=[...(new Set (data.events.map(e=>e.category)))];
                this.eventosFiltrados =  data.events;
            }
            )
            .catch( err => console.log( err ) )
    },
    computed : {
        filtro(){
            let filtradoBusqueda = this.eventos.filter( evento => evento.name.toLowerCase().includes( this.valorBusqueda.toLowerCase() ) )
            let filtradoCheck = filtradoBusqueda.filter( evento => this.checked.includes( evento.category ) || this.checked.length == 0 )
            this.eventosFiltrados = filtradoCheck
        },
        }

})

app.mount('#app')







