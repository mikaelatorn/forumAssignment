# forumAssignment

Uppgift i Avancerad webbutveckling 2 på Lernia Yrkeshögskola - Javascript Front-end utveckling. 
Den här uppgiften är ett forum där användare kan registrera sig och skriva inlägg samt skriva kommentarer på andras inlägg.

#### Dokumentation : 
 
##### Server :
- För att köra programmet: 
  - npm install
  - npm start
- Körs på localhost:3000,
- Databasen är i Firebase med två collections, Users och posts.   

 

##### Användare : 
 
Data schema för användarna : 
 
 User : {
 
    email: { string } ,
    uid: { string }, 
    isAdmin : { bool },
    username: { string },
   
}


- Användare kan Registrera sig genom att gå till fliken Registrera
    - Användaren skriver in sitt email, password och username
    - skickas till firebase
    - firebase kollar så att email:en är ledig 
    - om den är så skapas en ny användare i Firebase users 
    - användaren skickas vidare till landningsidan och är nu inloggad
- Användare kan logga in med email via login fliken  
  - Användaren skriver in sitt email, password
  - skickas en auth request till Firebase
  - Firebase kollar så att en användare med det email och password finns i databasen och authentiserar användaren
  - användaren skickas vidare till landningsidan och är nu inloggad
- Användare kan logga in med google via login fliken  
  - Användaren klickar login with google
  - skickas en auth request till Firebase
  - Firebase authentiserar användaren och skickar tillbaka ett användarobjekt
  - Om det är första gången användaren loggar in så skapas en användare i databasen med de uppgifter från användarobjektet 
  - användaren skickas vidare till landningsidan och är nu inloggad
- Logga ut
  - Knappen logga ut (log out) visas när en användare är inloggad
  - tryck på knappen och användarobjektet i redux state tas bort och det skickas ett signup call till firebase vilket gör att användaren loggas ut
  - användaren skickas till login igen
- Admin kan ta bort posts och göra andra användare till admin
  - för att se sidan “admin-panel” och kunna göra andra användare till admi behöver admin logga in med admin1@admin , lösen: hej123  endast den inloggningen har möjlighet att se sidan till en början  
- isAdmin flaggan ändras för de användarna som  admin väljer att göra till admin. Då har de access till Admin panel och kan ta bort alla posts
   - (Normala användare kan bara ta bort sina egna posts)
- Det enda som går att se utan att vara inloggad är signup och login sidan

##### Posts

Data schema för inlägg : 

Post : {

    uid:  string (uid för author) ,
    id:  string ,
    author: string (username av author),
    title: string,
    text: string,
    comments: {
      id: string key,
      comment: string,
      author: string (username),
      uid: string (user uid),
    }
}

  
- Se alla inlägg
  - Alla inlägg i databasen hämtas från Firebase och läggs till i redux state genom firebase listener child_added
  - Dessa inlägg syns på landningssidan 
- Skriva inlägg 
  - När användaren loggat in så kan han/hon skriva en post med en titel och en text
  - På submit så skickas ett post object till Firebase som lägger till en i databasen.
  - Redux state lägger också till en post i state.posts som live updaterar sidan
  - I den nya inlägget kan du nu se titeln, texten, username på användaren som skrev inlägget. Det finns också ett input fält där en användare kan skriva en kommentar på inlägget  
- Ta bort alla inlägg 
  - Den användaren som skrev inlägget eller admin kan ta bort inlägget
  - När användaren trycker på delete post så skickas det till firebase remove() som tar bort den post
  - När inlägget tas bort från firebase databasen så körs firebase event listener child_removed som tar bort samma inlägg i redux state och sidan updateras med att inlägget tas bort
  
 ###### Comments
 Comments är ett nested object i post objectet
 
 - En användare kan skriva en kommentar på inlägg
   - I inläggen finns det ett input fält där en användare kan skriva in en kommentar och trycka på send
   - Då letas rätt inlägg upp i firebase databasen och ett comment object läggs till i det korrekta inlägget
   - Efter att det är tillagt i databasen updateras redux state med comment objektet och vyn updateras

 
