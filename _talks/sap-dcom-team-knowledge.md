---
title: "Making Team Knowledge Accessible with AI Agents"
excerpt: "A SAP dcom presentation to around 400 people on making knowledge from team meetings and documentation searchable through AI agents."
event: "SAP dcom"
event_date: "2026"
format: Presentation
featured: true
image: /assets/images/talks/sap-dcom-team-knowledge.jpg
image_alt: "Aleksandar Aytov taking a photo from the stage with the SAP dcom audience seated behind him."
image_caption: "Sharing the team knowledge approach with an audience of around 400 people at SAP dcom."
resources:
  - label: LinkedIn recap
    url: https://www.linkedin.com/feed/update/urn:li:activity:7473732051670614017/
---

At **SAP dcom**, I presented to around **400 people** an approach to making team knowledge accessible through AI agents. The idea addressed a familiar problem: useful explanations and context are often shared in meetings, then become difficult to find when someone needs them later.

That affects both newcomers learning how a team works and experienced colleagues trying to recover the context of an earlier discussion.

## From meetings to searchable knowledge

The approach connects meeting knowledge with AI-assisted retrieval:

1. **Transcribe meetings** to capture the information shared in conversation.
2. **Create text documents** from those transcripts, making the content available for retrieval.
3. **Generate embeddings** that represent the meaning of the text.
4. **Store the embeddings in a vector database** so relevant information can be found by similarity.
5. **Make the knowledge available through Joule**, using a retrieval-augmented generation (RAG) service exposed through an MCP server.

This gives an AI assistant a way to retrieve relevant team knowledge when a colleague asks a question. Documentation and knowledge from previous discussions become easier to find through a conversational interface.

## Supporting the whole team

For newcomers, the aim is to make the team's accumulated knowledge easier to explore while they get up to speed. For senior colleagues, it is a way to find, reuse, and share information without having to reconstruct every previous conversation.

The presentation focused on making knowledge sharing part of everyday work: capturing what the team already knows and giving people a practical way to access it when they need it.
