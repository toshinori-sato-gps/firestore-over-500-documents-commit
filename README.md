# Test committing over 500 documents to firestore

## Setting

### Firebase settings

- enable firebase authentication anonymous method
- enable firestore

### Please set your firestore security rules

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2023, 7, 27);
    }
  }
}
```

### Please set your firebase configuration in index.ts

## How to run

```bash
$ yarn
$ yarn start
```
