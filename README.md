Program main goals: 
1) Calculate player's (specifically batter's) decision score using information presented in Trackman file/s.
2) Generate player's letter grades using their decision score
3) Add grade and decision score information of the players to the TruMedia file.
4) Reorganize the order of the players in the TruMedia file from highest to lowest decision score.

Scoring logic: 
## PitchCall

| Call?                  | Description                                              | Coordinates needed? If not, why?                    | Score        |
|------------------------|----------------------------------------------------------|-----------------------------------------------------|--------------|
| BallCalled             | Outside strike zone & no swing                           | No, ball already outside strike zone                | +0.25        |
| FoulBallFieldable      | Foul ball potentially be caught for an out               | No, batter hit the ball                             |              |
| FoulBallNotFieldable   | Foul ball not catchable                                  | No, batter hit the ball                             |              |
| HitByPitch             | Batter hit by pitch and awarded first base               |                                                     |              |
| InPlay                 | Batter put the ball into fair territory                  | No, batter hit the ball                             |              |
| StrikeCalled           | Inside strike zone & no swing                            | No, ball already inside strike zone                 |              |
| StrikeSwinging         | Inside/Outside strike zone & swing but missed            | Yes                                                 | Out = -1 |

---

## KorBB

| Call?      | Description                                     | Coordinates needed? If not, why?                            | Score                  |
|------------|-------------------------------------------------|-------------------------------------------------------------|------------------------|
| Strikeout  | Batter struck out (swinging or looking)         | Yes, for swinging<br>No, for looking                        | Swinging = -1.5<br>Looking = -2 |
| Walk       | Pitcher throws 4 balls outside strike zone & no swing |                                                         |                        |
| Undefined  |                                                 |                                                             |                        |

---

## PlayResult

| Call?           | Description                                               | Coordinates needed? If not, why?        | Score |
|-----------------|-----------------------------------------------------------|-----------------------------------------|--------|
| Single          | The batter hit safely and reached first base              |                                         |        |
| Double          | The batter reached second base on a hit                   |                                         |        |
| HomeRun         | Batter hits home run                                      | No, batter hit the ball                 | +4     |
| Out             | Batter was put out                                        |                                         |        |
| FieldersChoice  | A fielder put out a different runner, not the batter      |                                         |        |
| Error           | A defensive error allowed the batter to reach base        |                                         |        |
| Undefined       |                                                           |                                         |        |

Other: 
- Coordinates of the ball on the strike zone can be found under the columns "PlateLocSide" and "PlateLocHeight" in the Trackman file/s.
- Strike zone dimensions used:
<img width="279" height="254" alt="strikezone" src="https://github.com/user-attachments/assets/b28e51b3-66b5-44a4-ab06-12dc549b2acb" />

- URL to access app: https://baseball-stats-app-rg2p.onrender.com (takes ~40 sec to access after extended period of inactivity as we are using the free website deploy version)
