import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useState, useEffect, useContext, useRef } from "react";
import { GameContext } from "../context/GameContext";
import { generateAnswer } from "../utils/generateAnswer";
import { checkUserAnswerValid } from "../utils/checkUserAnswerValid";
import { MAX_SECONDS, MAX_ATTEMPTS } from "../config";

const BeforeGame = ({ startGuess, lastDigit }) => {
  return (
    <View style={styles.promptBox}>
      <Text style={styles.promptText}>
        Guess a number between 1 & 100 that is multiply of {lastDigit}
      </Text>
      <Pressable onPress={startGuess}>
        <Text style={styles.startText}>Start</Text>
      </Pressable>
    </View>
  );
};

const Guess = ({
  answer,
  userAnswer,
  onChangeUserAnswer,
  onSubmitGuess,
  attemptsLeft,
  seconds,
  lastDigit,
}) => {
  const [isShowHint, setIsShowHint] = useState(false);

  const handleShowHint = () => {
    setIsShowHint(true);
  };

  return (
    <View style={styles.promptBox}>
      <Text style={styles.promptText}>
        Guess a number between 1 & 100 that is multiply of {lastDigit}
      </Text>
      <TextInput value={userAnswer} onChangeText={onChangeUserAnswer} />
      <Text>Attempts left: {attemptsLeft}</Text>
      <Text>Timer: {seconds}</Text>
      {isShowHint && (
        <Text>
          The number is between {answer < 50 ? "1 and 50" : "50 and 100"}
        </Text>
      )}
      <Button title="USE A HINT" onPress={handleShowHint} />
      <Button title="SUBMIT GUESS" onPress={onSubmitGuess} />
    </View>
  );
};

const CorrectResult = ({ attemptsLeft, onNewGame }) => {
  return (
    <View>
      <Text>You guess correct!</Text>
      <Text>Attempts used: {MAX_ATTEMPTS - attemptsLeft}</Text>
      <Button title="NEW GAME" onPress={onNewGame} />
    </View>
  );
};

const OutOfTimeResult = () => {
  return <Text>Time up</Text>;
};

const OutOfAttemptsResult = () => {
  return <Text>Out of Attempts</Text>;
};

const IncorrectResult = ({ userAnswer, answer, onTryAgain, onEndGame }) => {
  return (
    <View>
      <Text>You did not guess correct!</Text>
      <Text>
        {+userAnswer < answer
          ? "You should guess higher."
          : "You should guess lower."}
      </Text>
      <Button title="TRY AGAIN" onPress={onTryAgain} />
      <Button title="END THE GAME" onPress={onEndGame} />
    </View>
  );
};

export default function GameScreen() {
  const { phone, setCurrentScreen, setName, setEmail, setPhone } =
    useContext(GameContext);
  const [answer, setAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState(""); // current user input answer
  const [stage, setStage] = useState("beforeGame"); // beforeGame, guess, result
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [seconds, setSeconds] = useState(MAX_SECONDS);
  const timerRef = useRef(null);

  const lastDigit = +phone[phone.length - 1];

  const handleRestart = () => {
    setCurrentScreen("start");
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleNewGame = () => {
    setStage("beforeGame");
    clearInterval(timerRef.current);
  };

  const startGuess = () => {
    setStage("guess");
    // generate a new answer based on user's phone
    const newAnswer = generateAnswer(phone);
    setAnswer(newAnswer);
    console.log("current correct answer is:", newAnswer);
    setSeconds(MAX_SECONDS);
    setAttemptsLeft(MAX_ATTEMPTS);
    setUserAnswer("");

    // reset countdown
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  };

  // when left seconds becomes 0, time is up;
  useEffect(() => {
    if (seconds > 0) {
      return;
    }
    clearInterval(timerRef.current);
    // time is up, show result
    setStage("result");
  }, [seconds]);

  const handleChangeUserAnswer = (userAnswer) => {
    setUserAnswer(userAnswer);
  };

  const handleSubmitGuess = () => {
    if (!checkUserAnswerValid(userAnswer, lastDigit)) {
      Alert.alert(
        "Invalid number",
        `Number has to be a multiply of ${lastDigit}\nbetween 1 and 100.`,
        [{ text: "OKay" }],
        { cancelable: true },
      );
      return;
    }

    // user submit a guess, shows the result
    setStage("result");
    setAttemptsLeft((attemptsLeft) => attemptsLeft - 1);
  };

  const handleTryAgain = () => {
    setStage("guess");
    setUserAnswer("");
  };

  const handleEndGame = () => {
    setStage("beforeGame");
    clearInterval(timerRef.current);
    // TODO: what to do when ending the game?
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <Pressable onPress={handleRestart}>
          <Text style={styles.restartText}>Restart</Text>
        </Pressable>
        {stage === "beforeGame" && (
          <BeforeGame startGuess={startGuess} lastDigit={lastDigit} />
        )}
        {stage === "guess" && (
          <Guess
            answer={answer}
            userAnswer={userAnswer}
            onChangeUserAnswer={handleChangeUserAnswer}
            onSubmitGuess={handleSubmitGuess}
            attemptsLeft={attemptsLeft}
            seconds={seconds}
            lastDigit={lastDigit}
          />
        )}
        {stage === "result" &&
          (+userAnswer === answer ? (
            <CorrectResult
              attemptsLeft={attemptsLeft}
              onNewGame={handleNewGame}
            />
          ) : attemptsLeft === 0 ? (
            <OutOfAttemptsResult />
          ) : seconds === 0 ? (
            <OutOfTimeResult />
          ) : (
            <IncorrectResult
              userAnswer={userAnswer}
              answer={answer}
              onEndGame={handleEndGame}
              onTryAgain={handleTryAgain}
            />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#79bbff",
  },
  gameContainer: {
    width: "80%",
    alignItems: "center",
  },
  restartText: {
    fontSize: 16,
    color: "#4d83ff",
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  promptBox: {
    backgroundColor: "#9e9e9e",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  promptText: {
    color: "#4b0f8e",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  startText: {
    color: "#4b0f8e",
    fontSize: 20,
    fontWeight: "bold",
  },
});
