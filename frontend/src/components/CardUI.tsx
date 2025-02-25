import React, { useState } from 'react';

function CardUI() {
  let _ud : any = localStorage.getItem('user_data');
  let ud = JSON.parse( _ud );
  let userId : string = ud.id;
  let firstName : string = ud.firstName;
  let lastName : string = ud.lastName;
  const [search, setSearchValue] = useState('');
  const [card, setCardNameValue] = useState('');
  const [searchResults, setResults] = useState('');
  const [cardList, setCardList] = useState('');
  const [message, setMessage] = useState('');

  function handleSearchTextChange( e: any ) : void
  {
    setSearchValue( e.target.value );
  }
  function handleCardTextChange( e: any ) : void
  {
    setCardNameValue( e.target.value );
  }
  async function addCard(e: any): Promise<void> {
    e.preventDefault();
  
    const obj = { userId: userId, card: card };
    const js = JSON.stringify(obj);
  
    try {
      const response = await fetch('http://localhost:5000/api/addcard', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' }
      });
      
      // Use .json() instead of text() if your server returns JSON
      const res = await response.json();
      console.log("Add Card API response:", res);
      
      if (res.error && res.error.length > 0) {
        setMessage("API Error:" + res.error);
      } else {
        setMessage('Card has been added');
        // Optionally, update your card list state if you want the new card to appear immediately.
      }
    } catch (error: any) {
      setMessage(error.toString());
      console.error("Error in addCard:", error);
    }
  }
  
  async function searchCard(e: any): Promise<void> {
    e.preventDefault();
  
    const obj = { userId: userId, search: search };
    const js = JSON.stringify(obj);
  
    try {
      const response = await fetch('http://localhost:5000/api/searchcards', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' }
      });
  
      // Use .json() to directly parse JSON response
      const res = await response.json();
      console.log("Search API response:", res);
  
      const _results = res.results;
      let resultText = '';
      for (let i = 0; i < _results.length; i++) {
        resultText += _results[i];
        if (i < _results.length - 1) {
          resultText += ', ';
        }
      }
      setResults('Card(s) have been retrieved');
      setCardList(resultText);
    } catch (error: any) {
      alert(error.toString());
      setResults(error.toString());
      console.error("Error in searchCard:", error);
    }
  }
  

  return (
    <div id="cardUIDiv">
      <br />
      Search: <input type="text" id="searchText" placeholder="Card To Search For" onChange={handleSearchTextChange} />
      <button type="button" id="searchCardButton" className="buttons" onClick={searchCard}>Search Card</button><br />
      <span id="cardSearchResult">{searchResults}</span>
      <p id="cardList">{cardList}</p><br /><br />
      Add: <input type="text" id="cardText" placeholder="Card To Add" onChange={handleCardTextChange} />
      <button type="button" id="addCardButton" className="buttons" onClick={addCard}>Add Card</button><br />
      <span id="cardAddResult">{message}</span>
    </div>
  );
}
export default CardUI;
