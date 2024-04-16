import useHttp from "../hooks/useHttp.js";
import MealsItem from "./MealsItem.jsx";
import Error from "./Error.jsx";


const requestConfig = {};

export default function Meals() {
    const {data:loadedMeals , isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig, [])

    if(isLoading){
        return <p className="center">Fetching the meals</p>
    }
    if(error){
        return <Error title="Failed to fetch meals" message={error} />
    }
    return <ul id="meals">
        {loadedMeals.map(meal => <MealsItem key={meal.id} meal={meal} />)}
    </ul>
}