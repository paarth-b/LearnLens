import json, os, torch
from pydantic import BaseModel, Field
from langchain_anthropic import ChatAnthropic
from langchain_openai import OpenAIEmbeddings
from langchain.prompts import ChatPromptTemplate
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer

#API
ChatAnthropic.api_key = os.getenv("ANTHROPIC_API_KEY")

# Load the index
#index = faiss.read_index("/home/pbatra6/sunhacks/text_data/001 - 1. Introduction to Algorithms.txt")

loader = TextLoader("/home/pbatra6/sunhacks/text_data/142 - 2.7.1  Two Way MergeSort - Iterative method.txt")
midman = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=250, chunk_overlap=20)
texts = text_splitter.split_documents(midman)
embeddings = OpenAIEmbeddings()
#print(texts)

vectorstore = FAISS.from_documents(texts, embeddings)

# Query

query = """
        Based on the following context, generate 5 multiple-choice questions using Chain of Thought reasoning.
        Each question should have 4 options (A, B, C, D) and one correct answer.

        Context: {context}

        Think through the process step-by-step:
        1. Identify key concepts in the context.
        2. Formulate questions that test understanding of these concepts.
        3. Generate plausible but incorrect options along with the correct answer.
        4. Ensure questions are diverse and cover different aspects of the context.

        Output the questions in JSON format  
                      """

# RAG

docs = vectorstore.similarity_search_with_score(query=query, k=4)

page_cont = [doc for doc, score in docs]


context_text = "\n\n".join([document.page_content for document in page_cont])

PROMPT_TEMPLATE = """
Answer the question based only on the following context:
{context}
Answer the question based on the above context: {question}.
Provide a detailed answer.
Don’t justify your answers.
Don’t give information not mentioned in the CONTEXT INFORMATION.
Do not say "according to the context" or "mentioned in the context" or similar.
"""

# load retrieved context and user query in the prompt template
prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
prompt = prompt_template.format(context=context_text, question=query)

# Initialize LLM
llm = ChatAnthropic(model="claude-3-5-sonnet-20240620")

response = llm.invoke(prompt)
print(response.content)

# class MCQ(BaseModel):
#     question: str = Field(description="The question text.")
#     options: dict = Field(description="A dictionary containing the multiple-choice options.")
#     correct_answer: str = Field(description="The correct answer to the question.")
    
# retriever = vectorstore.as_retriever()

# structured_mcq = llm.with_structured_output(MCQ)

# rag_chain = (
#   {"context": retriever}
#    | llm
# )

# print(structured_mcq.invoke())
