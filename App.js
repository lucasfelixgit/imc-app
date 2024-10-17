import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultadoIMC, setResultadoIMC] = useState(null);
  const [classificacao, setClassificacao] = useState('');


  const calcularIMC = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
      alert('Insira valores válidos.');
      return;
    }

    const imc = pesoNum / (alturaNum * alturaNum);
    setResultadoIMC(imc.toFixed(2));

    if (imc < 18.5) {
      setClassificacao('Abaixo do peso');
    } 
    else if (imc >= 18.5 && imc < 24.9) {
      setClassificacao('Peso normal');
    } 
    else if (imc >= 25 && imc < 29.9) {
      setClassificacao('Sobrepeso');
    } 
    else if (imc >= 30 && imc < 39.9) {
      setClassificacao('Obesidade');
    } 
    else {
      setClassificacao('Obesidade grave');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Altura (m)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <Button title="Calcular IMC" onPress={calcularIMC} />

      {resultadoIMC && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>IMC: {resultadoIMC}</Text>
          <Text style={styles.classificacao}>{classificacao}</Text>
        </View>
      )}

      <Image source={require('./assets/metric.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#f3b61f'
  },

  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },

  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  classificacao: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },

  image: {
    width: 200,
    height: 200,
    marginVertical: 50,
  },
});