**Main goals:** 
1) Calculate player's (specifically batter's) decision score using information presented in Trackman file/s.
2) Generate player's letter grades using their decision score
3) Add grade and decision score information of the players to the TruMedia file.
4) Reorganize the order of the players in the TruMedia file from highest to lowest decision score.

**Scoring logic:** 
## PitchCall

| Call?                | Description                                              | Coordinates needed? If not, why?         | Score     |
|----------------------|----------------------------------------------------------|------------------------------------------|-----------|
| BallCalled           | Outside strike zone & no swing                           | No, ball already outside strike zone     | +0.25     |
| FoulBallFieldable    | Foul ball potentially be caught for an out               | No, batter hit the ball                  | N/A       |
| FoulBallNotFieldable | Foul ball not catchable                                  | No, batter hit the ball                  | N/A       |
| HitByPitch           | Batter hit by pitch and awarded first base               | N/A                                      | N/A       |
| InPlay               | Batter put the ball into fair territory                  | No, batter hit the ball                  | N/A       |
| StrikeCalled         | Inside strike zone & no swing                            | No, ball already inside strike zone      | N/A       |
| StrikeSwinging       | Inside/Outside strike zone & swing but missed            | Yes                                      | Out = -1 |

---

## KorBB

| Call?      | Description                                     | Coordinates needed? If not, why?                  | Score                           |
|------------|-------------------------------------------------|---------------------------------------------------|----------------------------------|
| Strikeout  | Batter struck out (swinging or looking)         | Yes, for swinging<br>No, for looking              | Swinging = -1.5<br>Looking = -2 |
| Walk       | Pitcher throws 4 balls outside strike zone & no swing |                                               | N/A                            |
| Undefined  | N/A                                             | N/A                                               | N/A                            |

---

## PlayResult

| Call?           | Description                                            | Coordinates needed? If not, why? | Score |
|-----------------|--------------------------------------------------------|----------------------------------|--------|
| Single          | The batter hit safely and reached first base           | N/A                              | N/A    |
| Double          | The batter reached second base on a hit                | N/A                              | N/A    |
| HomeRun         | Batter hits home run                                   | No, batter hit the ball          | +4     |
| Out             | Batter was put out                                     | N/A                              | N/A    |
| FieldersChoice  | A fielder put out a different runner, not the batter   | N/A                              | N/A    |
| Error           | A defensive error allowed the batter to reach base     | N/A                              | N/A    |
| Undefined       | N/A                                                    | N/A                              | N/A    |

**Score ranges and corresponding grades**
| Score Range      | Grade |
|----------------------|-----------|
| Less than -0.5       | C−        |
| -0.5 to < 0.0        | C         |
| 0.0 to < 0.5         | C+        |
| 0.5 to < 1.0         | B−        |
| 1.0 to < 1.5         | B         |
| 1.5 to < 2.0         | B+        |
| 2.0 to < 2.5         | A−        |
| 2.5 to < 3.0         | A         |
| 3.0 and above        | A+        |

**Other:** 
- Coordinates of the ball on the strike zone can be found under the columns "PlateLocSide" and "PlateLocHeight" in the Trackman file/s.
- Strike zone dimensions used: <p align="center"> <img src="https://github.com/user-attachments/assets/b28e51b3-66b5-44a4-ab06-12dc549b2acb" alt="strikezone" style="width:418.5px; height:381px;" /></p>

- Causes of missing decision scores and grades for certain players in the final Excel sheet (expressed through the greyed-out cells):
  - One possible cause is that the batter's records are entirely missing from the Trackman/s provided.
  - Another likely cause is the slight differences between how a batter's name is listed in TruMedia vs. in the Trackman file/s. As the program uses the batter's name in TruMedia as the main name to search for a match in the Trackman file/s, if the batter's full name in both types of files is not exactly the same (eg. Jamie Daly =/= Jameson Daly), the program looks past it and the Trackman data is not extracted for further calculation. --> A quick way to fix this is to change the full name of that/those batter/s in the TruMedia file only under the "playerFullName" column (as we only use names under that column for name matching) to the exact name of that batter listed in the Trackman file/s. After those changes are made, rerun the program and that/those player/s data should appear.

|<img width="479" height="202" alt="missing-trackman" src="https://github.com/user-attachments/assets/ccf25660-3f68-426d-ab08-915e60b48ef0"/>|<img width="479" height="202" alt="semi-missing-trackman" src="https://github.com/user-attachments/assets/1b8a6d2e-2e27-477e-894f-eb6294cff478"/>|
|:--:|:--:|
| *Final Excel sheet example (before = mismatch in batter's name)* | *Final Excel sheet example (after = adjusted name to match Trackman)* |

- URL to access app: `https://baseball-stats-app-rg2p.onrender.com` (takes ~40 sec to access after an extended period of inactivity, as we are using the free website deploy version)
