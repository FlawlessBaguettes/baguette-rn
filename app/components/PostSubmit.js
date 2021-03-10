import { CommonActions } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import axios from "axios";

import { AuthContext } from "./AuthContext";
import FormTextInput from "./FormTextInput";
import CustomButton from "./CustomButton";

import FormStyle from "../styles/FormStyle";

import { validatePostTitle } from "../utils/FormValidation";

import { POST_POSTS_ENDPOINT } from "../api/constants";

function PostSubmit({ navigation, route }) {
  const { authState } = useContext(AuthContext);
  const [isPostButtonDisabled, setIsPostButtonDisabled] = useState(true);
  const [title, setTitle] = useState(null);
  const [video, setVideo] = useState(route.params.video);

  useEffect(() => {
    updatePostButton()
  })

  const handleTitle = (text) => {
    setTitle(text)
  };

  onPress = () => {
    const uri = video.uri;
    const uriParts = uri.split("/");
    const fileName = uriParts[uriParts.length - 1];
    const fileNameParts = fileName.split(".");
    const fileType = fileNameParts[fileNameParts.length - 1];

    const bodyFormData = new FormData();
    bodyFormData.append("video", {
      uri: uri,
      name: fileName,
      type: `video/${fileType}`,
    });

    bodyFormData.append("title", title);
    bodyFormData.append("parent_id", route.params.parentId)

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authState.token}`
    };

    let config = {
      method: "post",
      url: POST_POSTS_ENDPOINT,
      headers: headers,
      data: bodyFormData,
    };

    axios(config)
      .then(function (response) {
        console.log(response);

        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'ListPostsScreen' }
            ],
          })
        );
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const updatePostButton = () => {
    const isValidForm = validateForm();

    isValidForm ? setIsPostButtonDisabled(false) : setIsPostButtonDisabled(true);
  }

  const validateForm = () => {
    return validatePostTitle(title) === true;
  }

  return (
    <ScrollView contentContainerStyle={FormStyle.container}>
      <View style={FormStyle.containerForm}>
        <FormTextInput
          autoCapitalize={"none"}
          autoCorrect={false}
          clearTextOnFocus={false}
          header={"Title"}
          onChangeText={handleTitle}
          validateInput={validatePostTitle}
        />
      </View>

      <View style={FormStyle.containerButtons}>
        <CustomButton
          disabled={isPostButtonDisabled}
          isPrimary={true}
          onPress={onPress}
          title={"Post"}
        />
      </View>
    </ScrollView>
  );
}

export default PostSubmit;
