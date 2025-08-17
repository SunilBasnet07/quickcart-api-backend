export const formatterUserData = (data) => {
    return {
        id:data?.id,
        name: data?.name,
        email: data?.email,
        number: data.number,
        profileImageUrl:data?.profileImageUrl,
        roles: data?.roles,
        createdAt: data?.createdAt,
        address:{
            city:data?.address?.city,
            province:data?.address?.province,
            country:data?.address?.country
        }
 
    }

}