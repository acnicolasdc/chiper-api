const ordersMock = [
    {
        "id": 1,
        "state": 0,
        "date_order": "09/22/2019",
        "date_delivery": "05/21/2019",
        "time_delivery": "08:00",
        "products": [{_id:'5da68d3', name:'Chocolatina Jet', price:500}, {_id:'5da68er', name:'Head&Shoulder', price:3000}],
        "id_user": "5da68d3ffc13ae23a5000000",
        "totalToPay": 3500
    },
    {
        "id": 2,
        "state": 0,
        "date_order": "09/22/2019",
        "date_delivery": "05/21/2019",
        "time_delivery": "18:00",
        "products": [{_id:'5da6845', name:'AminoAcidos', price:5000}, {_id:'5da66er', name:'Axe intenze', price:30000}],
        "id_user": "5da68d3ffc13ae23a5000000",
        "totalToPay": 35000
    },
];
class OrdersServiceMock{
    async getOrders() {
        return Promise.resolve(ordersMock);
    }
    async createOrders() {
        return Promise.resolve(ordersMock[0]);
    }
}
function filteredOrdersMock(date) {
    return ordersMock.filter(order => order.date_order === date);
}
module.exports = { ordersMock, filteredOrdersMock, OrdersServiceMock };