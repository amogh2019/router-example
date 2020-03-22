# the snake game system design v1





## Design process



###  The Expectations from the Game / Requriements 

The game should be able to 
   - Move snake
   - Generate food in play field
   - Snake should be able to eat the food and grow
   - Maintain max length attained in a gameplay

### Getting Actors

Just one actor : The SnakeCharmer


### Getting Use Cases for the Actors

- **SnakeCharmer**
   -  Move snake in four directions
   -  View his Current and Maximum Snake Length

### Define entities (all nouns) 

- Snake Grid : 
   - The field over which the snake moves. (grey)
   - Current Snake 
      -  Current snake is taken as a collection of positions (x,y) (yellow)
   - Food for snake

- Snake Card :
   - Wrapper to Move and Update Snake and its Food based on SnakeCharmer's whims

- Directions
   - ```javascript
      dirctionsToIndex = {
            'ArrowUp': 4,
            'ArrowDown': 2,
            'ArrowLeft': 3,
            'ArrowRight': 1
        }
      ```

### Define Actions (all verbs) 

- Snake Grid : 
   - Render the Snake and GamePlayField

- Snake Card :
   - Initialize and Update Snake Positions in Snake Grid
      -  ```javascript
          windowSize: 400,
          
          squareSize: 10,
          
          positions: [[100, 200], [90, 200], [80, 200], [70, 200],  [60, 200], [50, 200]],
          
          maxLength: 6,
      ```

   - Initialize and Update Food position for the Snake in Snake Grid
      - ```javascript
          foodPosition: getRandomPos(10, 400) 
        ```
   - Take Inputs from SnakeCharmer to move the Snake. (this determines the Head positions of the snake to be updated with)
      - Keyboard inputs
         -  map keys as per directionsToIndex.
         - this sets the head
      - Clickable Buttons
      - Swipes in the SnakeGrid
   - Maintain Directions for each element of the Snake.
      - directions: [1, 1, 1, 1, 1, 1, 1]
   - Scheduled Action to update Snake positions based on direction
      - relocate Method
         -  To be called once the frame time ends, and we need to move and update snake to new direction as per SnakeCharmer's command
         -  Steps
            -   move all points
            -   shift direction to right by one step // keeping the first element as it is. First element's direction for the next frame is updated by the SnakeCharmer // rest we need to cascade positions of the top part of the later part.
               - snake continues to go in the same direction if the SnakeCharmer is not charming enough.
            -  if food found on head // relocate food // increase length at end // update max length
            -  if repeats found in current position // snake tried ate itself // reset to intial state, keep max length achieved
            -  


        
