import React from 'react';

const leagueChampionDataURL =
    'https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=image&champListData=info&dataById=false';
const fetchLeagueChampionData = url => {
    fetch(url).then(resp => resp.json());
};
