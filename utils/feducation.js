function formatFeducationData(inputData) {
  return { ...inputData.fields, id: inputData.sys.id };
}

export default formatFeducationData;
