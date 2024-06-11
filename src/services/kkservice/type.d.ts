declare namespace KkService {

  interface JXKDoorLock {
    result: string
    status: number
  }
  interface ErrorRes {
    code: number
    message: string
    requestId: string
  }
  interface Hitokoto {
    commit_from: string
    commit_id: string
    created_at: string
    creator: string
    creator_uid: number
    from: string
    from_who: string
    hitokoto: string
    id: number
    length: number
    source: string
    type: string
  }

}
