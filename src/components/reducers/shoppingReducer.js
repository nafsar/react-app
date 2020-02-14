
import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING } from '../actions/action-types/shopping-actions'


const initState = {
    items: [
        {
            id: 1,
            title: 'Model 3',
            desc: "Model 3 is designed for electric-powered performance.",
            price: 49,
            img: 'images/model3.png'
        },
        {
            id: 2,
            title: 'Model X',
            desc: "Model X is built for efficiency, with standard all-wheel drive.",
            price: 90,
            img: 'images/modelx.png'
            /* img: '%PUBLIC_URL%/images/item2.jpg' */

        },
        {
            id: 3,
            title: 'Model S',
            desc: "Model S is built for speed and endurance, with ludicrous acceleration.",
            price: 80,
            img: 'images/models.png'
        },
        {
            id: 4,
            title: 'Model Y',
            desc: "Model Y has a 300 mile range, 0-60 mph acceleration in 3.5 seconds.",
            price: 52,
            img: 'images/modely.png'
        },
        {
            id: 5,
            title: 'CyberTruck',
            desc: "Cybertruck is designed to have the utility of a truck with sports car performance.",
            price: 49,
            img: 'images/modelt.png'
        },
        {
            id: 6,
            title: 'Roadster',
            desc: "The quickest car in the world, with record-setting acceleration.",
            price: 250,
            img: 'images/modelr.png'
        }
    ],
    addedItems: [],
    total: 0

}
const cartReducer = (state = initState, action) => {

    //INSIDE HOME COMPONENT
    if (action.type === ADD_TO_CART) {
        let addedItem = state.items.find(item => item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.id === item.id)
        if (existed_item) {
            addedItem.quantity += 1
            return {
                ...state,
                total: state.total + addedItem.price
            }
        }
        else {
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price

            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }

        }
    }
    if (action.type === REMOVE_ITEM) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        let new_items = state.addedItems.filter(item => action.id !== item.id)

        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
        console.log(itemToRemove)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //in shoping CART COMPONENT
    if (action.type === ADD_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + addedItem.price
        return {
            ...state,
            total: newTotal
        }
    }
    if (action.type === SUB_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }

    }

    if (action.type === ADD_SHIPPING) {
        return {
            ...state,
            total: state.total + 6
        }
    }

    if (action.type === 'SUB_SHIPPING') {
        return {
            ...state,
            total: state.total - 6
        }
    }

    else {
        return state
    }

}

export default cartReducer
