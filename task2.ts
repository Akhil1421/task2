interface Edge {
    pickup : string,
    drop: string
}

interface Adjacency {
    [key: string]: string[];
}

function dfs(adjacency: Adjacency, source: string, visited: any, drop_points: Set<string>){
    if(visited[source]!==undefined){
        return;
    }
    visited[source] = true
    if(drop_points.has(source)){
        drop_points.delete(source)
    }
    adjacency[source]?.forEach((element:string) => {
        if(visited[element]===undefined){
            dfs(adjacency,element,visited,drop_points)
        }
    });
}
function validateTrip(setOfTrips: Edge[], pickups: string[], drop_points: Set<string>){
    
    let visited = {}
    let adjacency:Adjacency = {}
    setOfTrips.forEach(trip => {
        if(adjacency[trip.pickup]===undefined){
            adjacency[trip.pickup] = [trip.drop]
        }
        else{
            adjacency[trip.pickup].push(trip.drop)
        }
    });
    pickups.forEach(pickup => {
        dfs(adjacency,pickup,visited,drop_points);
    });
    
    return (drop_points.size === 0)
}


let drop_points:Set<string> = new Set(['C', 'D']);
let pickups: string[] = ['A','B']

let trip1: Edge[] = [
    {"pickup": "A", "drop": "W"},
    {"pickup": "W", "drop": "C"},
    {"pickup": "W", "drop": "D"}
]

let trip2: Edge[] = [
    {"pickup": "A", "drop": "W1"},
    {"pickup": "B", "drop": "W2"},
    {"pickup": "W3", "drop": "C"},
    {"pickup": "W4", "drop": "D"},
]
console.log(validateTrip(trip1,pickups,drop_points) ? "Valid" : "Invalid")

drop_points = new Set(['C','D'])
console.log(validateTrip(trip2,pickups,drop_points) ? "Valid" : "Invalid")
