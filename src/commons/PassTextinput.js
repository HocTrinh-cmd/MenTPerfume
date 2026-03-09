import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const PassTextinput = (props) => {
    const { title, styles, value, onChangeText, iconLeft, iconRightVisible, iconRightHidden } = props;
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
                {iconLeft && (
                    <Image
                        source={iconLeft}
                        style={{ width: 20, height: 20 }}
                    />
                )}
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                />
                <TouchableOpacity onPress={toggleSecureTextEntry}>
                    <Image
                        source={secureTextEntry ? iconRightHidden : iconRightVisible}
                        style={{ width: 20, height: 20 }}
                    />
                </TouchableOpacity>
        </View>
    );
};

export default PassTextinput;