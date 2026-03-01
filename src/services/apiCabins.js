import { supabase, supabaseUrl } from '../integrations/supabase'

export async function getCabins() {
  let { data: cabins, error } = await supabase.from('cabins').select('*')
  if (error) {
    console.error(error)
    throw new Error('Failed to fetch cabins')
  }

  return cabins
}

export async function createEditCabin(cabin, id) {
  const hasImagePath = cabin.image && cabin.image?.startsWith?.(supabaseUrl)
  let imageName = `${cabin.image.name}`.replaceAll('/', '-')
  imageName = await RenameForExistentCabin(imageName)

  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // Create new cabin
  let query = supabase.from('cabins')
  if (!id) query = query.insert([{ ...cabin, image: imagePath }])
  if (id) query = query.update({ ...cabin, image: imagePath }).eq('id', id)

  const { data, error, status, statusText } = await query.select().single()

  if (error) {
    console.error(error, status, statusText)
    throw new Error('Failed to create cabin')
  }
  console.log(data)

  // Upload image to storage
  // const avatarFile = event.target.files[0]
  if (hasImagePath) return data
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, cabin.image)

  if (storageError) {
    console.error(storageError)
    await supabase.from('cabins').delete().eq('id', data.id)
    throw new Error('Failed to upload image and the cabin was not created')
  }
  return data
}
export async function RenameForExistentCabin(imageName) {
  const { data, error } = await supabase.storage.from('cabin-images').list('', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  })

  if (error) {
    console.error(error)
    throw new Error('Failed to check if image exists')
  }

  const fileList = Array.isArray(data) ? data : []

  // console.log('文件列表:', fileList)

  const baseName = imageName.split('.')[0]
  const extension = imageName.split('.').slice(1).join('.')

  const matchingFiles = fileList.filter(file => {
    const fileName = file.name
    const fileNameParts = fileName.split('.')
    const fileBaseName = fileNameParts[0]
    const fileExtension = fileNameParts.slice(1).join('.')

    return fileBaseName.startsWith(baseName) && fileExtension === extension
  })

  // console.log('匹配的文件:', matchingFiles)

  if (matchingFiles.length > 0) {
    matchingFiles.sort((a, b) => a.name.localeCompare(b.name))
    const lastFile = matchingFiles[0]
    // console.log(lastFile)

    const parts = lastFile.name.split('.')
    let basePart = parts[0]

    if (basePart.includes(' copy')) {
      if (basePart.endsWith(' copy')) {
        basePart = basePart + ' 1'
      } else {
        const copyMatch = basePart.match(/ copy (\d+)$/)
        if (copyMatch) {
          const copyNumber = parseInt(copyMatch[1], 10)
          basePart = basePart.replace(/ copy \d+$/, ` copy ${copyNumber + 1}`)
        } else {
          basePart = basePart + ' copy'
        }
      }
    } else {
      basePart = basePart + ' copy'
    }

    parts[0] = basePart
    imageName = parts.join('.')
  }

  return imageName
}

export async function deleteCabin(id) {
  const { data, error, status, statusText } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error, status, statusText)
    throw new Error('Failed to delete cabin')
  }

  return data
}
