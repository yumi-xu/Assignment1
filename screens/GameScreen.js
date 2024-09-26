import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
} from "react-native";
import { useState, useEffect, useContext, useRef } from "react";
import { GameContext } from "../context/GameContext";
import { generateAnswer } from "../utils/generateAnswer";
import { checkUserAnswerValid } from "../utils/checkUserAnswerValid";
import { colors, MAX_SECONDS, MAX_ATTEMPTS } from "../utils/helper";
import Card from "../components/Card";

const BeforeGame = ({ startGuess, lastDigit }) => {
  return (
    <Card>
      <Text style={styles.promptText}>
        Guess a number between 1 & 100 that is multiply of {lastDigit}
      </Text>
      <Button title="Start" onPress={startGuess}>
        color={colors.buttonTextBlue}
      </Button>
    </Card>
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
    <Card>
      <Text style={styles.promptText}>
        Guess a number between 1 & 100 that is multiply of {lastDigit}
      </Text>
      <TextInput
        value={userAnswer}
        onChangeText={onChangeUserAnswer}
        style={styles.input}
      />
      <Text>Attempts left: {attemptsLeft}</Text>
      <Text>Timer: {seconds}</Text>
      {isShowHint && (
        <Text>
          The number is between {answer < 50 ? "1 and 50" : "50 and 100"}
        </Text>
      )}
      <Button title="USE A HINT" onPress={handleShowHint} />
      <Button title="SUBMIT GUESS" onPress={onSubmitGuess} />
    </Card>
  );
};

const CorrectResult = ({ attemptsLeft, onNewGame }) => {
  return (
    <Card>
      <Text style={styles.text}>You guess correct!</Text>
      <Text style={styles.text}>
        Attempts used: {MAX_ATTEMPTS - attemptsLeft}
      </Text>
      <Image
        source={{
          uri: "https://picsum.photos/id/1024/100/100",
        }}
        style={styles.image}
        alt="The game is over"
      />
      <Button
        title="NEW GAME"
        onPress={onNewGame}
        color={colors.buttonTextBlue}
      />
    </Card>
  );
};

const OutOfTimeResult = ({ onNewGame }) => {
  return (
    <Card>
      <Text style={styles.text}>The game is over</Text>
      <Image
        source={require("../assets/sad.jpeg")}
        style={styles.image}
        alt="The game is over"
      />
      <Text style={styles.text}>You are out of time</Text>
      <Button
        title="NEW GAME"
        onPress={onNewGame}
        color={colors.buttonTextBlue}
      />
    </Card>
  );
};

const OutOfAttemptsResult = ({ onNewGame }) => {
  return (
    <Card>
      <Text style={styles.text}>The game is over</Text>
      <Image
        source={require("../assets/sad.jpeg")}
        style={styles.image}
        alt="The game is over"
      />
      <Text style={styles.text}>You are out of attempts</Text>
      <Button
        title="NEW GAME"
        onPress={onNewGame}
        color={colors.buttonTextBlue}
      />
    </Card>
  );
};

const IncorrectResult = ({ userAnswer, answer, onTryAgain, onEndGame }) => {
  return (
    <Card>
      <Text>You did not guess correct!</Text>
      <Text>
        {+userAnswer < answer
          ? "You should guess higher."
          : "You should guess lower."}
      </Text>
      <Button title="TRY AGAIN" onPress={onTryAgain} />
      <Button title="END THE GAME" onPress={onEndGame} />
    </Card>
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
    clearInterval(timerRef.current);
    setStage("beforeGame");
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
      setUserAnswer("");
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <View style={styles.restartButtonContainer}>
          <Button title="Restart" onPress={handleRestart} />
        </View>
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
            <OutOfAttemptsResult onNewGame={handleNewGame} />
          ) : seconds === 0 ? (
            <OutOfTimeResult onNewGame={handleNewGame} />
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
    backgroundColor: colors.backgroundBlue,
    width: "100%",
    height: "100%",
  },
  gameContainer: {
    width: "80%",
    alignItems: "center",
  },
  restartButtonContainer: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  promptText: {
    color: colors.textPurple,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.textPurple,
    width: 50,
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    color: colors.textPurple,
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});
