const { createApp } = Vue

const app = createApp({
    data(){
        return {
        eventoseventosFuturos: [],
        eventosPasados: [],
        mayorAsistencia: "",
        menorAsistencia: "",
        mayorCapacidad: "",
        categories: {},
        categories2: {},
        }
    },
    created(){
        fetch( 'https://mindhub-xj03.onrender.com/api/amazing' )
        .then( response => response.json() )
        .then( data => { 
            this.eventosFuturos = data.events.filter(event => event.date >= data.currentDate);
            this.eventosPasados = data.events.filter(event => event.date < data.currentDate);

            this.mayorAsistencia = this.eventosPasados.sort((evento1, evento2) => {
                return (
                    (evento1.assistance / evento1.capacity) * 100 -
                    (evento2.assistance / evento2.capacity) * 100
                );
            }).slice(-1)[0]

            this.menorAsistencia = this.eventosPasados.sort((evento1, evento2) => {
                return (
                    (evento1.assistance / evento1.capacity) * 100 -
                    (evento2.assistance / evento2.capacity) * 100
                );
            }).slice(0,1)[0]

            this.mayorCapacidad = data.events.sort((evento1, evento2) => {
                return ( evento1.capacity - evento2.capacity);
            }).slice(-1)[0]
            
            this.eventosFuturos.forEach(event => {
                if (!this.categories[event.category]) {
                    this.categories[event.category] = {
                        price: 0,
                        estimate: 0,
                        capacity: 0,
                    }
                }
                this.categories[event.category].price += event.price * event.estimate
                this.categories[event.category].capacity += event.capacity
                this.categories[event.category].estimate += event.estimate
            })

            this.eventosPasados.forEach(event => {
                if (!this.categories2[event.category]) {
                    this.categories2[event.category] = {
                        price: 0,
                        assistance: 0,
                        capacity: 0,
                    }
                }
                this.categories2[event.category].price += event.price * event.assistance
                this.categories2[event.category].capacity += event.capacity
                this.categories2[event.category].assistance += event.assistance
            })    
        })
        .catch( err => console.log( err ) )
    },
})
    
app.mount("#app")