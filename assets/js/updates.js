/*
local function getUpdate(placeId: number): string
    local data: {Updated: string} = game.HttpService:JSONDecodeAsync( game: HttpGetAsync(`https://economy.roblox.com/v2/assets/{placeId}/details`) )
    local updateTime = DateTime.fromIsoDate(data.Updated) :: DateTime

    local timeDiff = DateTime.now().UnixTimestamp - updateTime.UnixTimestamp
    local minutesRaw = timeDiff / 60
    local minutes = math.floor(minutesRaw)

    if minutes < 1 then
        return {(minutesRaw-minutesRaw) * 60} seconds ago`
    end

    local hoursRaw = minutesRaw / 60
    local hours = math.floor(hoursRaw)

    if hours < 1 then
        return {(hoursRaw - hours) 60} minutes and {(minutesRaw-minutesRaw) * 60} seconds ago
    end

    local daysRaw = hours Raw / 24
    local days = math.floor(daysRaw)
    
    if days < 1 then
        return {hours} hours and {math.floor( (daysRaw - days) *60)} minutes ago`
    end

    return {days} days and {(hours) - (days * 24)} hours ago`
end
*/

function getUpdate(placeId) {
    fetch(`https://economy.roblox.com/v2/assets/${placeId}/details`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

        .then(data => {
            console.log("API Response:", data);
            const time = 0;
        })

        .catch(error => {
            console.error("Fetch error:", error);
        });
}

getUpdate(4111023553)