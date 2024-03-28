"use strict";
function dfs(adjacency, source, visited, drop_points) {
    var _a;
    if (visited[source] !== undefined) {
        return;
    }
    visited[source] = true;
    if (drop_points.has(source)) {
        drop_points.delete(source);
    }
    (_a = adjacency[source]) === null || _a === void 0 ? void 0 : _a.forEach((element) => {
        if (visited[element] === undefined) {
            dfs(adjacency, element, visited, drop_points);
        }
    });
}
function validateTrip(setOfTrips, pickups, drop_points) {
    let visited = {};
    let adjacency = {};
    setOfTrips.forEach(trip => {
        if (adjacency[trip.pickup] === undefined) {
            adjacency[trip.pickup] = [trip.drop];
        }
        else {
            adjacency[trip.pickup].push(trip.drop);
        }
    });
    pickups.forEach(pickup => {
        dfs(adjacency, pickup, visited, drop_points);
    });
    return (drop_points.size === 0);
}
let drop_points = new Set(['C', 'D']);
let pickups = ['A', 'B'];
let trip1 = [
    { "pickup": "A", "drop": "W" },
    { "pickup": "W", "drop": "C" },
    { "pickup": "W", "drop": "D" }
];
let trip2 = [
    { "pickup": "A", "drop": "W1" },
    { "pickup": "B", "drop": "W2" },
    { "pickup": "W3", "drop": "C" },
    { "pickup": "W4", "drop": "D" },
];
console.log(validateTrip(trip1, pickups, drop_points) ? "Valid" : "Invalid");
drop_points = new Set(['C', 'D']);
console.log(validateTrip(trip2, pickups, drop_points) ? "Valid" : "Invalid");
